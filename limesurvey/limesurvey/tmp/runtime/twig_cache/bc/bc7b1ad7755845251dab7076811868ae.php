<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* __string_template__7856a6190c7974db24c0cec927d042ba */
class __TwigTemplate_79c54da5d3c10926c3b37c30386f3f88 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        yield "<div class=\"card card-primary h-100\">
    <div class=\"card-header\">
        <h5 class=\"card-title\">";
        // line 3
        yield gT("Publication and access settings");
        yield "</h5>
        <a class=\"float-end btn btn-outline-secondary btn-xs pjax\" data-bs-toggle=\"tooltip\" title=\"";
        // line 4
        yield gT("Edit publication and access settings");
        yield "\" href=\"";
        yield LS_Twig_Extension::createUrl("surveyAdministration/rendersidemenulink", ["subaction" => "publication", "surveyid" => $this->sandbox->ensureToStringAllowed(($context["surveyid"] ?? null), 4, $this->source)]);
        yield "\">
           <i class=\"ri-key-line\"></i>
        </a>
    </div>
    <ul class=\"list-group list-group-flush\">
        <!-- Start date/time -->
        <li class=\"list-group-item p-0 border-0\">
            <div class=\"ls-flex-row col-12\">
               <div class=\"col-4 card-label\">
                    ";
        // line 13
        yield gT("Start date/time:");
        yield "
                </div>
                <div class=\"col-8 ls-card-grid__description\">
                    ";
        // line 16
        yield $this->sandbox->ensureToStringAllowed(($context["startdate"] ?? null), 16, $this->source);
        yield "
                </div>
            </div>
        </li>
        <!-- Expiration date/time -->
        <li class=\"list-group-item p-0 border-0\">
            <div class=\"ls-flex-row col-12\">
               <div class=\"col-4 card-label\">
                    ";
        // line 24
        yield gT("Expiration date/time:");
        yield "
                </div>
                <div class=\"col-8 ls-card-grid__description\">
                    ";
        // line 27
        yield $this->sandbox->ensureToStringAllowed(($context["expdate"] ?? null), 27, $this->source);
        yield "
                </div>
            </div>
        </li>
        <!-- Publicly available -->
        <li class=\"list-group-item p-0 border-0\">
            <div class=\"ls-flex-row col-12\">
               <div class=\"col-4 card-label\">
                    ";
        // line 35
        yield gT("Listed publicly:");
        yield "
                </div>
                <div class=\"col-8 ls-card-grid__description\">
                    ";
        // line 38
        yield ((CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "isListPublic", [], "any", false, false, true, 38)) ? (gT("Yes")) : (gT("No")));
        yield "
                </div>
            </div>
        </li>
    </ul>
</div>
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "__string_template__7856a6190c7974db24c0cec927d042ba";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  102 => 38,  96 => 35,  85 => 27,  79 => 24,  68 => 16,  62 => 13,  48 => 4,  44 => 3,  40 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "__string_template__7856a6190c7974db24c0cec927d042ba", "");
    }
    
    public function checkSecurity()
    {
        static $tags = array();
        static $filters = array();
        static $functions = array("gT" => 3, "createUrl" => 4);

        try {
            $this->sandbox->checkSecurity(
                [],
                [],
                ['gT', 'createUrl'],
                $this->source
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
