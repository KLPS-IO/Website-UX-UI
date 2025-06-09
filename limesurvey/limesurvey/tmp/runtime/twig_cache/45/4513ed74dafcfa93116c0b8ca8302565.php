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

/* ./subviews/survey/group_subviews/group_desc.twig */
class __TwigTemplate_94f51df9dc2375b2a2663d7445cd21fc extends Template
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
        // line 20
        yield "
";
        // line 21
        if (((CoreExtension::getAttribute($this->env, $this->source, ($context["aGroup"] ?? null), "showgroupinfo", [], "any", false, false, true, 21) == "D") || (CoreExtension::getAttribute($this->env, $this->source, ($context["aGroup"] ?? null), "showgroupinfo", [], "any", false, false, true, 21) == "B"))) {
            // line 22
            yield "    ";
            if ((CoreExtension::getAttribute($this->env, $this->source, ($context["aGroup"] ?? null), "description", [], "any", false, false, true, 22) != "")) {
                // line 23
                yield "        <!-- Group description -->
        <div class=\"";
                // line 24
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 24), "groupdesc", [], "any", false, false, true, 24), 24, $this->source);
                yield " space-col\" ";
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 24), "groupdesc", [], "any", false, false, true, 24), 24, $this->source);
                yield ">
            ";
                // line 25
                yield LS_Twig_Extension::processString($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aGroup"] ?? null), "description", [], "any", false, false, true, 25), 25, $this->source));
                yield "
        </div>
    ";
            }
        }
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/survey/group_subviews/group_desc.twig";
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
        return array (  57 => 25,  51 => 24,  48 => 23,  45 => 22,  43 => 21,  40 => 20,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/survey/group_subviews/group_desc.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/survey/group_subviews/group_desc.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 21);
        static $filters = array();
        static $functions = array("processString" => 25);

        try {
            $this->sandbox->checkSecurity(
                ['if'],
                [],
                ['processString'],
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
