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

/* ./subviews/content/mainrow.twig */
class __TwigTemplate_cce71cc916acba0096a7c26fd25aee14 extends Template
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
        // line 15
        yield "
<!-- Main Row -->
<div id=\"";
        // line 17
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "id", [], "any", false, false, true, 17), "mainrow", [], "any", false, false, true, 17), 17, $this->source);
        yield "\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 17), "mainrow", [], "any", false, false, true, 17), 17, $this->source);
        yield " >
    <!-- Main Col -->
    <div class=\"";
        // line 19
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 19), "maincol", [], "any", false, false, true, 19), 19, $this->source);
        yield " col-centered  space-col\" id=\"";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "id", [], "any", false, false, true, 19), "maincol", [], "any", false, false, true, 19), 19, $this->source);
        yield "\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 19), "maincol", [], "any", false, false, true, 19), 19, $this->source);
        yield ">

        ";
        // line 22
        yield "            ";
        // line 23
        yield "            ";
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/messages/warnings.twig");
        yield "
            ";
        // line 25
        yield "            ";
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/messages/justsaved.twig");
        yield "

            ";
        // line 28
        yield "            ";
        if ((($context["include_content"] ?? null) != "./subviews/content/")) {
            // line 29
            yield "                ";
            yield Twig\Extension\CoreExtension::include($this->env, $context, $this->sandbox->ensureToStringAllowed(($context["include_content"] ?? null), 29, $this->source));
            yield "
            ";
        }
        // line 31
        yield "

    </div> <!-- main col -->
</div> <!-- main row -->
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/content/mainrow.twig";
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
        return array (  82 => 31,  76 => 29,  73 => 28,  67 => 25,  62 => 23,  60 => 22,  51 => 19,  44 => 17,  40 => 15,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/content/mainrow.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/content/mainrow.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 28);
        static $filters = array();
        static $functions = array("include" => 23);

        try {
            $this->sandbox->checkSecurity(
                ['if'],
                [],
                ['include'],
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
